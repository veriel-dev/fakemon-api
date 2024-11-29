import express, { Router } from "express";
import path from "path";

// Configuración para el manejo de imágenes estáticas
interface ImageConfig {
  maxAge: number; // Tiempo de caché en segundos
  immutable: boolean; // Indica si el contenido nunca cambia
  baseDir: string; // Directorio base para las imágenes
}
const defaultConfig: ImageConfig = {
  maxAge: 7 * 24 * 60 * 60, // 7 días
  immutable: true, // Las imágenes de Fakemon no cambiarán una vez subidas
  baseDir: path.join(process.cwd(), "public", "images"),
};
// Middleware para el manejo de imágenes estáticas
export function createImageMiddleware(config: ImageConfig = defaultConfig) {
  const router = Router();

  // Middleware para headers de caché
  router.use((req, res, next) => {
    // Configurar headers de caché agresivos ya que las imágenes están optimizadas
    res.setHeader(
      "Cache-Control",
      `public, max-age=${config.maxAge}${config.immutable ? ", immutable" : ""}`
    );
    res.setHeader("Content-Type", "image/webp");
    next();
  });

  // Usar el middleware estático de Express con las opciones optimizadas
  router.use(
    express.static(config.baseDir, {
      maxAge: config.maxAge * 1000, // Express usa milisegundos
      immutable: config.immutable,
      etag: true, // Habilitar ETag para validación de caché
      lastModified: true, // Habilitar Last-Modified para validación de caché
    })
  );

  // Manejo de errores 404 para imágenes no encontradas
  router.use((req, res) => {
    res.status(404).json({ error: "Imagen no encontrada" });
  });

  return router;
}

// Función para configurar el manejo de imágenes en la aplicación
export function configureImageHandling(
  path: string,
  app: express.Application,
  config?: Partial<ImageConfig>
) {
  const finalConfig = { ...defaultConfig, ...config };
  app.use(path, createImageMiddleware(finalConfig));
}
