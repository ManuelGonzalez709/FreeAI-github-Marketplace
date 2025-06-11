# FreeAI GitHub Marketplace 🚀🤖

[![Vercel Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel)](https://free-ai-github-marketplace-d2pfysda3.vercel.app/)
[![GitHub](https://img.shields.io/github/license/ManuelGonzalez709/FreeAI-github-Marketplace?style=flat-square)](LICENSE)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI%20API-GitHub%20Marketplace-blue?logo=openai)](https://github.com/marketplace?type=actions&query=openai)

---

## 🌟 ¿Qué es este proyecto?

**FreeAI GitHub Marketplace** es una página web desarrollada en **React** que te permite disfrutar de la API de **OpenAI** completamente **GRATIS** gracias al Marketplace de GitHub.  
¡No necesitas pagar ni suscribirte a OpenAI! Simplemente utiliza tu propio **token de GitHub** para acceder a la IA.

---

## 🟢 ¿Cómo funciona?

- Utiliza la integración de OpenAI disponible en el [GitHub Marketplace](https://github.com/marketplace?type=actions&query=openai).
- El backend hace las peticiones a la API de OpenAI empleando tu token de GitHub, por lo que **NO necesitas una API Key de OpenAI**.
- Todo el código es abierto y puedes desplegarlo o usarlo directamente en Vercel.

---

## 🌐 Demo en Vivo

👉 [free-ai-github-marketplace-d2pfysda3.vercel.app](https://free-ai-github-marketplace-d2pfysda3.vercel.app/)

---

## 🛡️ Requisitos

- Solo necesitas un **token de GitHub** (puedes generarlo desde [aquí](https://github.com/settings/tokens)).
  - **Nota:** Con permisos mínimos de lectura es suficiente.

---

## 🧑‍💻 ¿Cómo hacer una petición a la API desde Postman?

Puedes interactuar directamente con la API usando Postman o cualquier cliente HTTP.

### 📬 Ejemplo de petición

**Endpoint:**
```
POST https://free-ai-github-marketplace-d2pfysda3.vercel.app/api/openai
```

**Headers:**
```
Authorization: Bearer TU_TOKEN_DE_GITHUB
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "messages": [
    { "role": "user", "content": "¿Cuál es la capital de Francia?" }
  ],
  "model": "openai/gpt-4o-mini"
}
```

**Respuesta esperada:**
```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "La capital de Francia es París."
      }
    }
  ],
  ...
}
```

---

## 📝 Pasos para probarlo

1. **Consigue tu token de GitHub:**  
   Ve a [GitHub Tokens](https://github.com/settings/tokens) y crea uno nuevo.  
   ![GitHub Token](https://img.shields.io/badge/GitHub-Token-blue?logo=github)

2. **Prueba la demo online:**  
   Accede a [la web desplegada](https://free-ai-github-marketplace-d2pfysda3.vercel.app/), introduce tu token y ¡empieza a chatear con la IA!  
   ![AI Chat](https://img.shields.io/badge/Chat%20con-OpenAI-green?logo=openai)

3. **Haz peticiones vía Postman o tu propio código:**  
   Simplemente sigue el ejemplo de arriba.

---

## 🛠️ Tecnologías usadas

- [React](https://reactjs.org/) ⚛️
- [Vercel](https://vercel.com/) 🚀
- [GitHub Marketplace](https://github.com/marketplace) 🛒
- [OpenAI API](https://platform.openai.com/docs/) 🤖

---

## 🎁 Contribuciones

¡Las contribuciones son bienvenidas! Haz un fork, propone cambios o reporta cualquier issue.

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

---

¡Gracias por usar **FreeAI GitHub Marketplace**!  
💬 [ManuelGonzalez709](https://github.com/ManuelGonzalez709)
