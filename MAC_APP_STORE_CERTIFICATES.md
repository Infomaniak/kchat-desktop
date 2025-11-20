# kchat Mac App Store - Certificate and Secrets Management

Documentation for creating and updating certificates required for TestFlight/Mac App Store builds.

## Prerequisites

- **Admin** or **Account Holder** access on Apple Developer
- **Admin** or **Account Holder** access on App Store Connect
- macOS with Xcode installed
- Admin access to GitHub repository secrets

---

## 1. Create Apple Certificates

### 1.1 Generate Certificate Signing Request (CSR)

1. Open **Keychain Access**
2. Menu: **Keychain Access → Certificate Assistant → Request a Certificate from a Certificate Authority**
3. Fill in:
   - **User Email Address**: your Apple Developer email
   - **Common Name**: your name or "Infomaniak"
   - **CA Email Address**: leave blank
   - **Request is**: check "Saved to disk"
4. Save the file as `CertificateSigningRequest.certSigningRequest`

⚠️ **Important**: The CSR creates a private key on your Mac. Always use the same Mac for the entire process.

---

### 1.2 Create "Mac App Distribution" Certificate

1. Go to [Apple Developer Portal](https://developer.apple.com/account/resources/certificates/list)
2. Click **+** to create a new certificate
3. Select **"Mac App Distribution"**
4. Upload the CSR created in step 1.1
5. Download the `.cer` certificate
6. Double-click the `.cer` to install it in Keychain

---

### 1.3 Create "Mac Installer Distribution" Certificate

1. On the same screen, click **+** again
2. Select **"Mac Installer Distribution"**
3. Upload the **SAME CSR** as before
4. Download the `.cer` certificate
5. Double-click to install it in Keychain

---

### 1.4 Verify Installation

In Keychain Access → **"My Certificates"**, you should see:
```
▶ 3rd Party Mac Developer Application: [Your Name]
  🔑 Private Key
▶ 3rd Party Mac Developer Installer: [Your Name]
  🔑 Private Key
```

If you don't see the private keys 🔑, restart from step 1.1 on the same Mac.

---

## 2. Create Provisioning Profile

### 2.1 Create Profile

1. Go to [Profiles](https://developer.apple.com/account/resources/profiles/list)
2. Click **+**
3. Select **"Mac App Store"**
4. Choose the kchat **Bundle ID** (e.g., `com.infomaniak.kchat`)
5. Select the **"Mac App Distribution"** certificate
6. Name the profile: `kchat Mac App Store`
7. Download the `.provisionprofile` file

---

## 3. Export Certificates

### 3.1 Export as .p12 Format

1. Open **Keychain Access**
2. Go to **"My Certificates"**
3. Select **both certificates** (Cmd+Click):
   - 3rd Party Mac Developer Application
   - 3rd Party Mac Developer Installer
4. Right-click → **"Export 2 items..."**
5. Format: **Personal Information Exchange (.p12)**
6. File name: `kchat-mas-certificates.p12`
7. Set a **strong password** and save it securely

---

### 3.2 Encode to Base64

Open Terminal and run:
```bash
# Encode .p12 certificates
base64 -i kchat-mas-certificates.p12 -o certificates-base64.txt

# Encode provisioning profile
base64 -i kchat_Mac_App_Store.provisionprofile -o profile-base64.txt
```

---

## 4. Create App Store Connect API Key

### 4.1 Generate Key

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. **Users and Access → API → App Store Connect API**
3. Click **+ (Generate API Key)**
4. Fill in:
   - **Name**: `kchat GitHub Actions CI`
   - **Access**: **App Manager**
5. Download the `.p8` file (⚠️ only one chance!)
6. Note the **Key ID** and **Issuer ID**

---

### 4.2 Encode API Key
```bash
# Encode .p8 key
base64 -i AuthKey_XXXXXXXXXX.p8 -o api-key-base64.txt
```

---

## 5. Update GitHub Secrets

Go to GitHub: **Settings → Secrets and variables → Actions → Repository secrets**

Create or update these secrets:

| Secret Name | Value | Source |
|-------------|-------|--------|
| `MM_DESKTOP_MAC_APP_STORE_CSC_LINK` | Content of `certificates-base64.txt` | Step 3.2 |
| `MM_DESKTOP_MAC_APP_STORE_CSC_KEY_PASSWORD` | .p12 password | Step 3.1 |
| `MM_DESKTOP_MAC_APP_STORE_MAS_PROFILE` | Content of `profile-base64.txt` | Step 3.2 |
| `MM_DESKTOP_MAC_APP_STORE_MACOS_API_KEY_ID` | Key ID (e.g., `ABC123XYZ`) | Step 4.1 |
| `MM_DESKTOP_MAC_APP_STORE_MACOS_API_ISSUER_ID` | Issuer ID (UUID format) | Step 4.1 |
| `MM_DESKTOP_MAC_APP_STORE_MACOS_API_KEY` | Content of `api-key-base64.txt` | Step 4.2 |

---

## 6. Certificate Renewal

Apple certificates expire after **1 year**.

### When to Renew?

- You'll receive an email from Apple ~30 days before expiration
- Check expiration date: Developer Portal → Certificates

### How to Renew?

1. **Revoke old certificates** in Developer Portal
2. Restart from step 1 (create new CSR)
3. Create new certificates
4. Update Provisioning Profile with new certificates
5. Re-export and update GitHub secrets

⚠️ **Don't delete old certificates before creating new ones**

---

## Troubleshooting

### "No valid signing identity found"

- Verify that private keys 🔑 are present in Keychain
- Recreate CSR from the same Mac

### "Provisioning profile doesn't include signing certificate"

- The provisioning profile uses an old certificate
- Recreate the provisioning profile with new certificates

### "Unable to find p12 certificate"

- The CSC_LINK base64 is corrupted or incomplete
- Check that there are no spaces or line breaks

### GitHub Action fails with "authentication failed"

- Verify App Store Connect API Keys
- Ensure the key has "App Manager" role minimum

---

## Contacts

- **Apple Developer Account Holder**: [email]
- **App Store Connect Admin**: [email]
- **GitHub Admin**: [email]

---

## Useful Links

- [Apple Developer Portal](https://developer.apple.com/account)
- [App Store Connect](https://appstoreconnect.apple.com)
- [Fastlane Documentation](https://docs.fastlane.tools/)
- [Electron Builder Mac Signing](https://www.electron.build/code-signing#macos)
