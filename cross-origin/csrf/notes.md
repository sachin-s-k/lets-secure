# Cross-Site Request Forgery (CSRF)

## 🔹 What is CSRF?

CSRF is a type of **web security vulnerability** where an attacker
tricks a user (who is already authenticated on a site) into performing
unwanted actions on that site **without their knowledge**.

It exploits the fact that browsers automatically include **cookies,
sessions, or tokens** when making requests to a domain.

---

## 🔹 Example Scenario

Imagine you're logged into your online banking site:

1.  You are authenticated → your browser has a valid session cookie.

2.  The bank allows money transfer by sending a request like:

        POST /transfer
        amount=1000&toAccount=attacker123

3.  Now, you visit a malicious site controlled by an attacker.\
    That site has hidden code like:

    ```html
    <form action="https://bank.com/transfer" method="POST">
      <input type="hidden" name="amount" value="1000" />
      <input type="hidden" name="toAccount" value="attacker123" />
    </form>
    <script>
      document.forms[0].submit(); // auto-submit
    </script>
    ```

4.  Since you are logged into the bank, your browser **automatically
    includes the session cookie**.\
    ✅ The bank thinks _you_ made the request → money is transferred to
    the attacker.

---

## 🔹 How to Mitigate CSRF

Common defenses:

1.  **CSRF Tokens (Synchronizer Token Pattern)**

    - The server generates a random, secret token per session or per
      request.

    - The token is embedded in forms or AJAX requests:

      ```html
      <form method="POST" action="/transfer">
        <input type="hidden" name="csrf_token" value="abc123xyz" />
        ...
      </form>
      ```

    - The server validates the token before processing.

    - Since the attacker's site cannot read the token (due to
      **Same-Origin Policy**), their forged request fails.

2.  **SameSite Cookies**

    - Setting cookies with the `SameSite` attribute prevents them from
      being sent on cross-site requests:

      ```http
      Set-Cookie: sessionid=abcd1234; SameSite=Strict; Secure; HttpOnly
      ```

    - Modes:

      - `Strict` → cookies sent only for same-origin requests.
      - `Lax` → cookies sent for top-level navigation GET requests.
      - `None` (requires `Secure`) → cookies sent cross-site (less
        safe).

3.  **Double Submit Cookie**
    - A CSRF token is stored in both a cookie and a request
      parameter.\
    - Server checks if both match → prevents CSRF.
4.  **Check Referer/Origin Headers**
    - Some apps validate the `Origin` or `Referer` header to ensure
      the request came from the same domain.\
    - Less reliable (can be stripped or blocked by proxies).
5.  **Use CAPTCHAs (Extra Layer)**
    - For critical operations (e.g., money transfer), require user
      interaction.

---

## ✅ Best Practice Today

- Always use **CSRF tokens** + `SameSite` cookies.
- For sensitive actions (like payments), add **re-authentication or
  CAPTCHA**.
