import { Exclude } from "class-transformer";
import { ValidRoles } from "src/auth/interfaces";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('text')
    name: string;

    @Column('text', {unique: true})
    email: string;

    @Column('text')
    @Exclude({'toPlainOnly': true})
    password: string;

    @Column('text',{ 
        array: true,
        default: [ValidRoles.USER]
    })
    roles: string[];

    @Column('text')
    avatar?: string;

    @Column('bool', {default: true})
    isActive: boolean;

    @CreateDateColumn()
    @Exclude({'toPlainOnly': true})
    createdAt: Date;
    
    @CreateDateColumn()
    @Exclude({'toPlainOnly': true})
    updatedAt: Date;

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    };
    
    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
    };

};

