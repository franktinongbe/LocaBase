# 🏨 LocaBase API

LocaBase est une API RESTful construite avec **Node.js**, **Express** et **MongoDB** (via Mongoose). Elle permet la gestion d'utilisateurs (avec rôles `user`, `pro`, `admin`) et la gestion de structures (hôtels et restaurants).

---

## 🚀 Fonctionnalités principales

- 🔐 Authentification avec JWT
- 🔒 Mots de passe sécurisés avec Bcrypt
- 👥 Rôles utilisateurs : `user`, `pro`, `admin`
- 🏨 Gestion des hôtels (CRUD)
- 🍽️ Gestion des restaurants (CRUD)
- 📄 Documentation interactive via Swagger
- 💳 Intégration CinetPay pour la gestion des paiements
- 📧 Envoi de factures par email après paiement

---

## ⚙️ Installation

### Prérequis

- Node.js v14+ recommandé
- MongoDB (local ou cloud MongoDB Atlas)
- Compte CinetPay pour l'intégration de paiement

### Étapes

```bash
git clone https://github.com/votre-utilisateur/LocaBase.git
cd LocaBase
npm install
