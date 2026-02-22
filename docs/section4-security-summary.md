# Section 4: Security and Compliance - Requirements Summary

## 4.1 Authentication and Authorization

### Authentication and Authorization Mechanisms
| Mechanism | Needed | Reasoning |
|-----------|--------|-----------|
| Login, sessions, etc. | No | App is single-user and runs entirely in the browser with localStorage. No auth mechanisms required. |

### Identity Provider
- None (no SSO, IAM, Entra ID, etc.).

### MFA, RBAC, ABAC
| Feature | Required | Reasoning |
|---------|----------|-----------|
| MFA | No | Not applicable for single-user, local-only app. |
| RBAC | No | Not applicable. |
| ABAC | No | Not applicable. |

### Short-Lived Tokens or OAuth2/SAML
| Protocol | Needed | Reasoning |
|----------|--------|-----------|
| Tokens, OAuth2, SAML | No | Zero external auth; no tokens or protocols required. |

## 4.2 Regulatory and Compliance

### Regulatory or Compliance Standards
| Standard | Applicable | Reasoning |
|----------|------------|-----------|
| GDPR, HIPAA, PCI-DSS, CCPA, etc. | No | All notes stay exclusively in the user's browser localStorage. No server, cloud, accounts, or data transmission. Local-first design avoids these regulations. |

### Audit Logging and Retention Requirements
- None. No server-side events, central logs, or audit trail required or generated. Browser localStorage is the only storage.

### Access to Audit Logs
- Not applicable. There are no audit logs. Only the single end-user has access to their own browser data.

## 4.3 Data Encryption

### Encryption at Rest and In Transit
- **At rest**: No encryption. Notes are stored in plain text in the user's browser localStorage (the only persistence method in scope).
- **In transit**: Automatic HTTPS from the static hosting provider. The app itself never transmits any note data over the network.

### Encryption Standards Required
| Standard | Required | Reasoning |
|----------|----------|-----------|
| AES-256, TLS 1.2+, etc. | No | None required for the application. In-transit protection uses hosting provider's default (TLS 1.2+ or TLS 1.3). |

### Key Management
- Not applicable. No encryption keys are created, stored, or managed in the MVP.