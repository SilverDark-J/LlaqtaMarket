CREATE DATABASE IF NOT EXISTS bd_llaqtamarket DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
USE bd_llaqtamarket;

-- Tabla Usuario
CREATE TABLE IF NOT EXISTS Usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  dni VARCHAR(20) UNIQUE,
  correo VARCHAR(150) UNIQUE NOT NULL,
  hash_contrasenia VARCHAR(255) NOT NULL,
  tipo_usuario VARCHAR(50) NOT NULL,
  estado_usuario ENUM('activo', 'bloqueado', 'eliminado') DEFAULT 'activo',
  fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_bloqueo DATETIME
) ENGINE=INNODB;

-- Tabla Administrador
CREATE TABLE IF NOT EXISTS Administrador (
  id_usuario INT PRIMARY KEY,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
) ENGINE=INNODB;

-- Tabla Cliente
CREATE TABLE IF NOT EXISTS Cliente (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  telefono VARCHAR(20),
  direccion VARCHAR(255),
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
) ENGINE=INNODB;

-- Tabla Emprendedor
CREATE TABLE IF NOT EXISTS Emprendedor (
  id_emprendedor INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  nombre_emprendimiento VARCHAR(150) NOT NULL,
  descripcion TEXT,
  categoria VARCHAR(100),
  logo_url VARCHAR(255),
  telefono VARCHAR(20),
  direccion VARCHAR(255),
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
) ENGINE=INNODB;

-- Tabla HistorialCambios
CREATE TABLE IF NOT EXISTS HistorialCambios (
  id_cambio INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario_responsable INT NOT NULL,
  entidad VARCHAR(50) NOT NULL,
  id_entidad INT NOT NULL,
  accion ENUM('bloquear', 'desbloquear', 'editar', 'eliminar') NOT NULL,
  descripcion TEXT,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario_responsable) REFERENCES Usuario(id_usuario)
) ENGINE=INNODB;

-- Tabla DetalleCambio
CREATE TABLE IF NOT EXISTS DetalleCambio (
  id_detalle INT AUTO_INCREMENT PRIMARY KEY,
  id_cambio INT NOT NULL,
  campo VARCHAR(100) NOT NULL,
  valor_anterior TEXT,
  valor_nuevo TEXT,
  FOREIGN KEY (id_cambio) REFERENCES HistorialCambios(id_cambio)
) ENGINE=INNODB;

-- Tabla Producto
CREATE TABLE IF NOT EXISTS Producto (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  id_emprendedor INT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  descripcion TEXT,
  imagen_url VARCHAR(255),
  fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_emprendedor) REFERENCES Emprendedor(id_emprendedor)
) ENGINE=INNODB;

-- Tabla Categoria
CREATE TABLE IF NOT EXISTS Categoria (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre_categoria VARCHAR(100) NOT NULL
) ENGINE=INNODB;

-- Tabla ProductoCategoria
CREATE TABLE IF NOT EXISTS ProductoCategoria (
  id_productocategoria INT AUTO_INCREMENT PRIMARY KEY,
  id_producto INT NOT NULL,
  id_categoria INT NOT NULL,
  FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
  FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
) ENGINE=INNODB;

-- Tabla Pedido
CREATE TABLE IF NOT EXISTS Pedido (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL,
  estado ENUM('pendiente', 'confirmado') DEFAULT 'pendiente',
  FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
) ENGINE=INNODB;

-- Tabla DetallePedido
CREATE TABLE IF NOT EXISTS DetallePedido (
  id_detallepedido INT AUTO_INCREMENT PRIMARY KEY,
  id_pedido INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido),
  FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
) ENGINE=INNODB;

-- Tabla Valoracion
CREATE TABLE IF NOT EXISTS Valoracion (
  id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  id_producto INT NOT NULL,
  nombre_cliente VARCHAR(150),
  comentario TEXT,
  puntuacion INT NOT NULL,
  fecha_comentario DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_cliente) REFERENCES Usuario(id_usuario),
  FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
) ENGINE=INNODB;

-- Tabla Carrito
CREATE TABLE IF NOT EXISTS Carrito (
  id_carrito INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) DEFAULT 0,
  FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
) ENGINE=INNODB;

ALTER TABLE Carrito ADD COLUMN estado ENUM('activo', 'comprado') DEFAULT 'activo';

-- Tabla DetalleCarrito
CREATE TABLE IF NOT EXISTS DetalleCarrito (
  id_detallecarrito INT AUTO_INCREMENT PRIMARY KEY,
  id_carrito INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_carrito) REFERENCES Carrito(id_carrito),
  FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
) ENGINE=INNODB;

USE bd_llaqtamarket;
select * from Usuario
where tipo_usuario = "emprendedor";
SELECT * FROM Emprendedor WHERE id_usuario = 45;
USE bd_llaqtamarket;
select * from Usuario
where tipo_usuario = "cliente";


select * from Cliente;

select * from Emprendedor;

USE bd_llaqtamarket;
select * from carrito;
select * from detallecarrito;

select * from Producto;
use bd_llaqtamarket;
select * from Producto;
select * from ProductoCategoria;
select * from Categoria;


USE bd_llaqtaMarket;
select * from pedido;
select * from detallepedido;
