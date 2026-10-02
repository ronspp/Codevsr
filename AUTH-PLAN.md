# Mangation — plan de login y registro

Las pantallas dedicadas de Login, Registro y Recuperación ya están implementadas como preview estático. La lectura sigue disponible como invitado.

## Experiencia mínima

Una página limpia con el logo de Mangation, sin banners ni ilustraciones laterales. Desde Perfil se abre Login; un enlace cambia a Registro. En móvil, campos grandes, teclado adecuado y botón visible sin taparlo con la navegación inferior.

- **Login:** email, contraseña con mostrar/ocultar, botón Entrar, enlace Olvidé mi contraseña y enlace Crear cuenta.
- **Registro:** nombre visible, email, contraseña y botón Crear cuenta. No pedir fecha de nacimiento, teléfono ni datos innecesarios. Confirmación de email tras registrarse.
- **Recuperación:** email → mensaje de envío → enlace temporal → nueva contraseña.
- **Después de entrar:** volver al manga o capítulo que estaba leyendo, sincronizar biblioteca, favoritos y progreso.
- **Salir:** cerrar la sesión del servidor y regresar a modo invitado. No borrar las listas locales de forma implícita.

Google puede añadirse después. No hace falta para una primera versión pequeña.

## Estados que sí hay que resolver

Enviando, validación junto al campo, credenciales inválidas, email pendiente de verificar, enlace vencido, conexión fallida y reintento. No mostrar éxito sin respuesta válida del backend. Evitar solicitudes duplicadas durante el envío.

## Contrato propuesto para la API

- POST /auth/register — nombre, email y contraseña; respuesta de verificación pendiente.
- POST /auth/login — crea sesión.
- GET /auth/session — usuario actual o no autenticado.
- POST /auth/logout — invalida sesión.
- POST /auth/forgot-password — respuesta genérica de solicitud recibida.
- POST /auth/reset-password — token temporal y nueva contraseña.
- POST /auth/verify-email — token de verificación.
- GET/PUT /me/library, /me/favorites y /me/progress — datos asociados al usuario.

La API o un proveedor de autenticación administra usuarios, contraseñas, correo y sesiones. Usar una cookie de sesión HttpOnly/Secure en producción; no guardar contraseñas ni tokens de sesión en localStorage. Proteger operaciones autenticadas y limitar intentos desde el backend. La API actual del catálogo se mantiene separada.

Al entrar por primera vez, proponer importar la biblioteca local. No sobrescribir el progreso remoto silenciosamente: conservar la lectura más reciente por manga.

## Implementación en orden

1. Confirmar el backend/proveedor que usará el proyecto y sus endpoints.
2. Crear las pantallas y conectar validación, login, registro y logout.
3. Conectar email, verificación y recuperación.
4. Sincronizar listas y progreso; probar el retorno al lector.
5. Verificar en Safari de iPhone y Chrome Android: teclado, autofill, navegación atrás, recarga y sesión vencida.

## Estado actual

`/login/`, `/register/` y `/forgot-password/` tienen formularios accesibles, navegación entre pantallas, validación básica de contraseña y estados de confirmación locales. No envían credenciales ni crean cuentas hasta conectar el backend. Biblioteca, favoritos y progreso funcionan localmente por navegador/origen; localhost y la IP de la red tienen almacenamientos distintos.
