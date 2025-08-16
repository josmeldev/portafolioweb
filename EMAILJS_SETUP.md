# 📧 Configuración de EmailJS para el Formulario de Contacto

## Pasos para configurar EmailJS:

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Regístrate con tu email `josmelvt@gmail.com`
3. Confirma tu email

### 2. Crear un servicio de email
1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **"Gmail"** (recomendado)
4. Conecta tu cuenta de Gmail `josmelvt@gmail.com`
5. Copia el **Service ID** que se genera

### 3. Crear un template de email
1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura el template así:

**Subject:** `{{subject}} - Nuevo mensaje desde tu portafolio`

**Content:**
```
Hola Josmel,

Has recibido un nuevo mensaje desde tu portafolio web:

Nombre/Empresa: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu formulario de contacto del portafolio.
```

4. Copia el **Template ID** que se genera

### 4. Obtener tu Public Key
1. Ve a **"Account"** → **"General"**
2. Copia tu **Public Key**

### 5. Configurar las variables de entorno
Edita el archivo `.env.local` y reemplaza los valores:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id_aqui
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

### 6. Reiniciar el servidor
```bash
npm run dev
```

## ✅ ¡Listo!
Ahora cuando alguien llene el formulario en tu portafolio, recibirás un email en `josmelvt@gmail.com`.

## 📊 Plan gratuito de EmailJS:
- 200 emails por mes
- Perfecto para un portafolio personal
- Sin costo

## 🔧 Troubleshooting:
- Si no recibes emails, revisa tu carpeta de spam
- Verifica que las variables de entorno estén correctas
- Asegúrate de que el servicio de Gmail esté conectado correctamente
