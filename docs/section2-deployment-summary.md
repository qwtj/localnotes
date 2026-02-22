# Section 2: Environment Approach and Infrastructure/Scaling - Deployment Strategy Summary

## 2.1 Environment Approach

### Deployment Type
- Neither container-based nor VM-based. The application is a static single-page app (built from Vite output), so deployment involves hosting the static files (dist folder). No containers, VMs, or servers are needed.

### Environment Constraints
- Budget capped at $0 (under $100 limit).
- No backend/server required (localStorage only for persistence).
- No regulatory, compliance, security, or organizational constraints.
- Goal: Maximum simplicity and instant browser delivery.

### Hybrid Approach Feasibility
- Not feasible or needed. Pure static hosting is sufficient, cheapest, and fastest for the MVP, avoiding unnecessary complexity and cost.

### Recommended Deployment
- Vercel or Netlify (free tier): One-click deploy from Git, automatic HTTPS, instant updates.
- Alternative: GitHub Pages (completely free).

## 2.2 Infrastructure and Scaling

### Scaling Under Increased Load
- Automatic via the hosting provider's global CDN. As a static app (HTML/CSS/JS files), increased users result in more static file deliveries from edge locations. No servers, databases, or backend components to scale manually.

### Hosting Requirements and Limitations
- **Tier**: Free tier only (Vercel or Netlify).
- **HTTPS**: Automatic and required.
- **Custom Domains**: Supported (optional).
- **Limitations**: Stay within free-tier bandwidth and build minutes (sufficient for MVP; monitor via dashboard).
- No other requirements (no compliance, SLAs, or paid add-ons).

### Environments Needed
| Environment | Description | Hosting |
|-------------|-------------|---------|
| Dev | Local machine (Vite dev server) | Local |
| Production | Single live deployment | Vercel/Netlify |
| Test/Staging | Not needed for MVP; preview deployments via pull requests available if desired | Vercel/Netlify (free) |

### Recommended Path
- Deploy the dist folder from Vite to Vercel or Netlify: One-click from GitHub, instant global CDN, automatic HTTPS. Total cost: $0.