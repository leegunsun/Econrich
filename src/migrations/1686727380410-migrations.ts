import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1686727380410 implements MigrationInterface {
    name = 'Migrations1686727380410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`regions\` (\`region_id\` int NOT NULL, \`region_name\` varchar(25) NOT NULL, PRIMARY KEY (\`region_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_history\` (\`employee_id\` int NOT NULL, \`start_date\` date NOT NULL, \`end_date\` date NOT NULL, \`job_id\` varchar(10) NOT NULL, \`department_id\` int NOT NULL, PRIMARY KEY (\`employee_id\`, \`start_date\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`jobs\` (\`job_id\` varchar(10) NOT NULL, \`job_title\` varchar(35) NOT NULL, \`min_salary\` decimal(8,0) UNSIGNED NULL, \`max_salary\` decimal(8,0) UNSIGNED NULL, PRIMARY KEY (\`job_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employees\` (\`employee_id\` int NOT NULL, \`first_name\` varchar(20) NULL, \`last_name\` varchar(25) NOT NULL, \`email\` varchar(25) NOT NULL, \`phone_number\` varchar(20) NULL, \`hire_date\` date NOT NULL, \`job_id\` varchar(10) NOT NULL, \`salary\` decimal(8,2) NOT NULL, \`commission_pct\` decimal(2,2) NULL, \`manager_id\` int NULL, \`department_id\` int NOT NULL, PRIMARY KEY (\`employee_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`departments\` (\`department_id\` int NOT NULL, \`department_name\` varchar(30) NOT NULL, \`manager_id\` int NULL, \`location_id\` int NOT NULL, PRIMARY KEY (\`department_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`locations\` (\`location_id\` int NOT NULL AUTO_INCREMENT, \`street_address\` varchar(40) NULL, \`postal_code\` varchar(12) NULL, \`city\` varchar(30) NOT NULL, \`state_province\` varchar(25) NULL, \`country_id\` varchar(255) NOT NULL, PRIMARY KEY (\`location_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`countries\` (\`country_id\` varchar(255) NOT NULL, \`country_name\` varchar(40) NOT NULL, \`region_id\` int NOT NULL, PRIMARY KEY (\`country_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`job_history\` ADD CONSTRAINT \`FK_dd0798e500a9360d4a61b3fd9e6\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`employee_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_history\` ADD CONSTRAINT \`FK_a7ca12187f1f072615ad4676014\` FOREIGN KEY (\`job_id\`) REFERENCES \`jobs\`(\`job_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_history\` ADD CONSTRAINT \`FK_32e94d59cf3ef7b0622f9ff8637\` FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`department_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_4d354377b20055b24f8ec430bd5\` FOREIGN KEY (\`job_id\`) REFERENCES \`jobs\`(\`job_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_678a3540f843823784b0fe4a4f2\` FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`department_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`departments\` ADD CONSTRAINT \`FK_eba67cbcdb7ed6949c14707fde7\` FOREIGN KEY (\`location_id\`) REFERENCES \`locations\`(\`location_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`locations\` ADD CONSTRAINT \`FK_e70736d3cab84632af5f1811d35\` FOREIGN KEY (\`country_id\`) REFERENCES \`countries\`(\`country_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`countries\` ADD CONSTRAINT \`FK_dd7e8f883d887a562db72d8e820\` FOREIGN KEY (\`region_id\`) REFERENCES \`regions\`(\`region_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`countries\` DROP FOREIGN KEY \`FK_dd7e8f883d887a562db72d8e820\``);
        await queryRunner.query(`ALTER TABLE \`locations\` DROP FOREIGN KEY \`FK_e70736d3cab84632af5f1811d35\``);
        await queryRunner.query(`ALTER TABLE \`departments\` DROP FOREIGN KEY \`FK_eba67cbcdb7ed6949c14707fde7\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_678a3540f843823784b0fe4a4f2\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_4d354377b20055b24f8ec430bd5\``);
        await queryRunner.query(`ALTER TABLE \`job_history\` DROP FOREIGN KEY \`FK_32e94d59cf3ef7b0622f9ff8637\``);
        await queryRunner.query(`ALTER TABLE \`job_history\` DROP FOREIGN KEY \`FK_a7ca12187f1f072615ad4676014\``);
        await queryRunner.query(`ALTER TABLE \`job_history\` DROP FOREIGN KEY \`FK_dd0798e500a9360d4a61b3fd9e6\``);
        await queryRunner.query(`DROP TABLE \`countries\``);
        await queryRunner.query(`DROP TABLE \`locations\``);
        await queryRunner.query(`DROP TABLE \`departments\``);
        await queryRunner.query(`DROP TABLE \`employees\``);
        await queryRunner.query(`DROP TABLE \`jobs\``);
        await queryRunner.query(`DROP TABLE \`job_history\``);
        await queryRunner.query(`DROP TABLE \`regions\``);
    }

}
