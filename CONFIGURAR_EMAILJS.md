# 🚀 GUÍA RÁPIDA: Configurar EmailJS en 5 minutos

## Paso 1: Crear cuenta en EmailJS
1. Ve a **https://www.emailjs.com/**
2. Haz clic en **"Sign Up"**
3. Regístrate con tu email: `josmelvt@gmail.com`
4. Confirma tu email

## Paso 2: Crear servicio de Gmail
1. En el dashboard, haz clic en **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **"Gmail"**
4. Haz clic en **"Connect Account"**
5. Autoriza con tu cuenta `josmelvt@gmail.com`
6. **COPIA EL SERVICE ID** (ejemplo: `service_abc123`)

## Paso 3: Crear template de email
1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura así:

**Template Name:** `portfolio_contact`

**Subject:** 
```
{{subject}} - Mensaje desde tu portafolio
```

**Content:**
```
Hola Josmel,

Tienes un nuevo mensaje desde tu portafolio:

Nombre/Empresa: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Enviado desde: https://tu-portafolio.com
```

4. Haz clic en **"Save"**
5. **COPIA EL TEMPLATE ID** (ejemplo: `template_xyz789`)

## Paso 4: Obtener Public Key
1. Ve a **"Account"** en el menú lateral
2. En la sección **"General"**
3. **COPIA TU PUBLIC KEY** (ejemplo: `abcd1234567890`)

## Paso 5: Actualizar el código
Abre el archivo `src/app/page.tsx` y reemplaza estas líneas:

```javascript
const serviceID = 'service_test'; // ← PEGA TU SERVICE ID AQUÍ
const templateID = 'template_test'; // ← PEGA TU TEMPLATE ID AQUÍ  
const publicKey = 'public_key_test'; // ← PEGA TU PUBLIC KEY AQUÍ
```

## Paso 6: Activar el envío real
Uncomenta (quita //) estas líneas en el código:

```javascript
/*
await emailjs.send(
  serviceID,
  templateID,
  {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_email: 'josmelvt@gmail.com'
  },
  publicKey
);
*/
```

## ✅ ¡Listo!
Ahora el formulario enviará emails reales a tu cuenta.

## 🎯 PLAN GRATUITO EMAILJS:
- ✅ 200 emails/mes gratis
- ✅ Perfecto para portafolios
- ✅ Sin tarjeta de crédito requerida
