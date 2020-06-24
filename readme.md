# hello-world-ci-cd

Sandbox for CI/CD exercising.

<p>To start the project execute script <code>yarn start</code> or <code>npm run start</code>.</p>

<p>To generate ssl certs</p>
<code>openssl req -x509 -out localhost.crt -keyout localhost.key \</code>
<code>-newkey rsa:2048 -nodes -sha256 \</code>
<code>-subj '/CN=localhost' -extensions EXT -config <( \</code>
<code>printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")</code>