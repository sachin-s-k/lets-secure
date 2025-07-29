# ✅ Web Application Security Checklist

## 1. Injection Attacks

- [ ] SQL Injection (SQLi)
- [ ] Cross-Site Scripting (XSS)
- [ ] Server-Side Request Forgery (SSRF)
- [ ] Server-Side JavaScript Injection (SSJI)
- [ ] Command Injection
- [ ] XML External Entities (XXE)
- [ ] LDAP Injection
- [ ] Dependency Injection

## 2. Authentication & Authorization

- [ ] Secure Authentication (e.g., MFA, rate limiting)
- [ ] Role-Based or Attribute-Based Access Control
- [ ] Secure Session Management
- [ ] Strong Password Hashing (bcrypt/scrypt/argon2)
- [ ] Account Lockout on Failed Logins
- [ ] OAuth 2.0 / OpenID Connect Security
- [ ] Implement Passwordless Authentication (optional)

## 3. Input Validation & Data Handling

- [ ] Whitelist Input Validation
- [ ] Output Encoding (context-specific)
- [ ] Secure File Upload Handling
- [ ] Harden JSON/XML Parsers

## 4. Transport Security

- [ ] Enforce HTTPS (with HSTS)
- [ ] Use TLS 1.2 or above
- [ ] Secure Cookie Flags (`Secure`, `HttpOnly`, `SameSite`)

## 5. Client-Side Security

- [ ] Use Content Security Policy (CSP)
- [ ] Set Security Headers (e.g., `X-Content-Type-Options`)
- [ ] Prevent Clickjacking with `X-Frame-Options` or `frame-ancestors`
- [ ] Use Subresource Integrity (SRI)
- [ ] Avoid storing sensitive data in localStorage/sessionStorage
- [ ] Sanitize DOM inputs (e.g., with DOMPurify)

## 6. Cross-Origin Protections

- [ ] Configure CORS securely
- [ ] CSRF protection (tokens, SameSite cookies)
- [ ] Enforce Same-Origin Policy where applicable

## 7. Security Monitoring & Logging

- [ ] Implement Security Monitoring & Alerts
- [ ] Log Authentication & Critical Actions
- [ ] Protect Logs from Tampering
- [ ] Detect and Alert on Anomalies

## 8. Dependencies & Supply Chain

- [ ] Regularly Audit Dependencies
- [ ] Lock Dependency Versions
- [ ] Use Trusted Registries Only
- [ ] Mitigate Prototype Pollution Risks

## 9. Infrastructure & Deployment

- [ ] Apply DevSecOps Practices
- [ ] Use Isolated Environments (Dev/Test/Prod)
- [ ] Store Secrets Securely (e.g., Vaults, env vars)
- [ ] Harden Containers (minimal base images, scans)
- [ ] Set Up WAF and Rate Limiting
- [ ] Enable DDoS Protection

## 10. Compliance & Legal

- [ ] Follow Applicable Regulations (GDPR, CCPA, HIPAA, PCI)
- [ ] Limit Data Retention
- [ ] Implement Consent Management
- [ ] Have a Breach Response Plan

## 11. Additional Best Practices

- [ ] Conduct Regular Penetration Testing
- [ ] Perform Threat Modeling
- [ ] Train Developers on Security
- [ ] Offer a Bug Bounty Program
- [ ] Implement Backups and Disaster Recovery
- [ ] Use CAPTCHA to Block Bots
- [ ] Conduct Secure Code Reviews
- [ ] Minimize Data Collection (Privacy by Design)
