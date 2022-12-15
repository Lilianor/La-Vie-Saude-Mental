-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema La-Vie-Saude-Mental
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema La-Vie-Saude-Mental
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `La-Vie-Saude-Mental` DEFAULT CHARACTER SET utf8 ;
USE `La-Vie-Saude-Mental` ;

-- -----------------------------------------------------
-- Table `La-Vie-Saude-Mental`.`psicologos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `La-Vie-Saude-Mental`.`psicologos` (
  `psicologo_id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(200) NOT NULL,
  `apresentacao` VARCHAR(400) NOT NULL,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  PRIMARY KEY (`psicologo_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `La-Vie-Saude-Mental`.`pacientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `La-Vie-Saude-Mental`.`pacientes` (
  `paciente_id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `idade` DATE NOT NULL,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  PRIMARY KEY (`paciente_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `La-Vie-Saude-Mental`.`atendimentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `La-Vie-Saude-Mental`.`atendimentos` (
  `atendimento_id` INT NOT NULL AUTO_INCREMENT,
  `data_atendimento` DATE NOT NULL,
  `observacao` TEXT(400) NOT NULL,
  `psicologos_psicologo_id` INT NOT NULL,
  `pacientes_paciente_id` INT NOT NULL,
  INDEX `fk_atendimentos_psicologos_idx` (`psicologos_psicologo_id` ASC) VISIBLE,
  PRIMARY KEY (`atendimento_id`),
  INDEX `fk_atendimentos_pacientes1_idx` (`pacientes_paciente_id` ASC) VISIBLE,
  CONSTRAINT `fk_atendimentos_psicologos`
    FOREIGN KEY (`psicologos_psicologo_id`)
    REFERENCES `La-Vie-Saude-Mental`.`psicologos` (`psicologo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_atendimentos_pacientes1`
    FOREIGN KEY (`pacientes_paciente_id`)
    REFERENCES `La-Vie-Saude-Mental`.`pacientes` (`paciente_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
