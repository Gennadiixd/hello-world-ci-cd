# hello-world-ci-cd

Sandbox for CI/CD exercising.

<p>To start the project execute script <code>yarn start</code> or <code>npm run start</code>.</p>

<p>To generate ssl certs</p>

```bash
openssl req -x509 -out myprojectdomain.dev.crt -keyout myprojectdomain.dev.key \
-newkey rsa:2048 -nodes -sha256 \
-subj '/CN=myprojectdomain.dev' -extensions EXT -config <( \
printf "[dn]\nCN=myprojectdomain.dev\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:myprojectdomain.dev\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
