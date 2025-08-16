# ⚠️ CONFIGURACIÓN TEMPORAL DE EMAILJS

## Para hacer que funcione inmediatamente, sigue estos pasos:

### Opción A: Configuración Rápida (5 minutos)

1. **Ve a https://www.emailjs.com/**
2. **Regístrate** con tu email
3. **En "Email Services"** → Add New Service → Gmail → Conecta tu cuenta
4. **Copia el Service ID** (algo como `service_abc123`)
5. **En "Email Templates"** → Create New Template → Usa este template:

**Template Name:** `portfolio_contact`

**Subject:** `{{subject}} - Mensaje desde portafolio`

**Content:**
```
De: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}
```

6. **Copia el Template ID** (algo como `template_xyz789`)
7. **En Account → General** → Copia tu **Public Key**

### Opción B: Configuración Manual Temporal

Mientras configuras EmailJS, puedes usar estos valores temporales:

1. Abre el archivo `src/app/page.tsx`
2. Reemplaza las líneas donde están las variables de entorno por valores reales:

```javascript
const serviceID = 'tu_service_id_aqui';
const templateID = 'tu_template_id_aqui';  
const publicKey = 'tu_public_key_aqui';
```

**¿Quieres que te ayude con alguna de estas opciones?**
