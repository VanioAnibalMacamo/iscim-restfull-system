-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 21, 2026 at 05:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spring_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nome` varchar(255) NOT NULL,
  `telefone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`id`, `email`, `nome`, `telefone`) VALUES
(2, 'maria.macamo@email.com', 'Maria Macamo', '841234567'),
(3, 'joao.sitoe@email.com', 'João Sitoe', '821234568'),
(4, 'ana.tembe@email.com', 'Ana Tembe', '861234569'),
(5, 'carlos.mondlane@email.com', 'Carlos Mondlane', '871234570'),
(6, 'fatima.cossa@email.com', 'Fátima Cossa', '841234571'),
(7, 'pedro.chissano@email.com', 'Pedro Chissano', '821234572'),
(8, 'isabel.nhantumbo@email.com', 'Isabel Nhantumbo', '861234573'),
(9, 'antonio.machava@email.com', 'António Machava', '871234574'),
(10, 'luisa.bila@email.com', 'Luísa Bila', '841234575'),
(11, 'manuel.mabunda@email.com', 'Manuel Mabunda', '821234576'),
(12, 'teresa.langa@email.com', 'Teresa Langa', '861234577'),
(13, 'domingos.zandamela@email.com', 'Domingos Zandamela', '871234578'),
(14, 'helena.guambe@email.com', 'Helena Guambe', '841234579'),
(15, 'rui.muianga@email.com', 'Rui Muianga', '821234580'),
(16, 'sandra.manhica@email.com', 'Sandra Manhiça', '861234581'),
(17, 'eduardo.maximiano@email.com', 'Eduardo Maximiano', '871234582'),
(18, 'graca.simango@email.com', 'Graça Simango', '841234583'),
(19, 'armando.nhaca@email.com', 'Armando Nhaca', '821234584'),
(20, 'claudia.mavie@email.com', 'Cláudia Mavie', '861234585'),
(21, 'helio.chongo@email.com', 'Hélio Chongo', '871234586'),
(22, 'mangai@email.com', 'Antonio Fenias Fabião Massangai', '841334567'),
(23, 'talbenz@email.com', 'Julio Benzema Talvez', '8432334567');

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `id` bigint(20) NOT NULL,
  `data` date DEFAULT NULL,
  `descricao` varchar(255) NOT NULL,
  `valor` decimal(12,2) NOT NULL,
  `cliente_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`id`, `data`, `descricao`, `valor`, `cliente_id`) VALUES
(1, '2026-10-20', 'Compra de material de escritório', 2500.00, 2),
(2, '2026-10-20', 'Compra de material de escritório', 2500.00, 2),
(3, '2026-10-20', 'Compra de material de escritório', 2500.00, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKg7202lk0hwxn04bmdl2thth5b` (`cliente_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `FKg7202lk0hwxn04bmdl2thth5b` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
