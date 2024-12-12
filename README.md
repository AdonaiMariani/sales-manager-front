# React Project

Este template proporciona una configuración mínima para comenzar a trabajar con React con Hot Module Replacement (HMR) y algunas reglas de ESLint.

## Configuración del Entorno de Desarrollo con Prettier

Si te unes a nuestro proyecto, usamos Prettier para asegurar un formato de código consistente en todo el código base. Sigue los pasos a continuación para configurar tu entorno de desarrollo con la configuración existente de Prettier.

### Prerrequisitos

Asegúrate de tener instalados Node.js y npm.

### Pasos para Configurar Prettier

1. **Clona el Proyecto**:

   ```bash
   git clone https://github.com/AdonaiMariani/sales-manager-front.git
   ```

2. **Instala las Dependencias**:

   Navega al directorio raíz del proyecto y ejecuta el siguiente comando:

   ```bash
   cd sales-manager-front
   npm install
   ```

3. **Integra con tu Editor**:

   Para aprovechar al máximo Prettier, recomendamos integrarlo con tu editor de código:

   #### VSCode:

   - Instala la extensión **Prettier - Code formatter**.
   - Configura VSCode para formatear automáticamente tu código al guardar agregando lo siguiente a tu archivo `settings.json`:

     ```json
     {
       "editor.formatOnSave": true,
       "editor.codeActionsOnSave": {
         "source.fixAll": true
       }
     }
     ```

     La opción `"editor.codeActionsOnSave": { "source.fixAll": true }` aplicará automáticamente todas las correcciones disponibles.

   #### IntelliJ IDEA (y otros IDEs de JetBrains):

   - Abre tu proyecto en IntelliJ IDEA.
   - Navega a **File > Settings** (o **IntelliJ IDEA > Preferences** en macOS).
   - En el cuadro de búsqueda, escribe **Prettier** y selecciónalo en los resultados.
   - Asegúrate de que el paquete de Prettier apunte al archivo local del proyecto en `node_modules`. Si no es así, especifica la ruta (usualmente es `[project_root]/node_modules/prettier`).
   - Activa la opción **Run on save for files** y especifica los patrones de archivo que Prettier debe formatear al guardar (por ejemplo, `{**/*.{js,jsx,ts,tsx}}`).
   - Aplica los cambios y cierra el cuadro de diálogo de configuración.

---

¡Con estos pasos estarás listo para colaborar en nuestro proyecto de React! 🎉
