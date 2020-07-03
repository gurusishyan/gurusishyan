import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('static_data')
export class StaticDataEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'static_data_id' })
  static_data_id: string;

  @Column('varchar', { length: 35, name: 'data_label_key' })
  data_label_key: string;

  @Column('varchar', { length: 35, name: 'data_label_type' })
  data_label_type: string;

  @Column('varchar', { name: 'data_label_value' }) data_label_value: string;
}
