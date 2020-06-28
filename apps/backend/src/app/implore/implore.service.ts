import { Injectable } from '@nestjs/common';
import { ImploreRepository } from './implore.repository';
import { CreateImploreDTO, ImploreRO, UpdateImploreDTO } from './implore.dto';
import { IErrorMessage, IFile } from '../shared/interfaces';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ImploreService {
  constructor(private imploreRepository: ImploreRepository) {}

  /**
   *
   * @param uploads Array of documents to store for the implore
   * @param base_path base path of the document to be saved. Usually BASE_PATH_DIR from .env
   * @param implore Corresponding implore for which the document to be saved
   */
  private writeAttachments(
    uploads: IFile[],
    base_path: string,
    implore: ImploreRO
  ) {
    const file_details = uploads.map((file) => {
      if (!existsSync(join(base_path, implore.implore_id))) {
        mkdirSync(join(base_path, implore.implore_id), {
          recursive: true,
        });
      }
      return {
        name: join(implore.implore_id, file.originalname),
        data: file.buffer,
      };
    });
    let paths: string[] = [];
    for (let i = 0; i < file_details.length; i++) {
      const path_to_write = join(base_path, file_details[i].name);
      writeFileSync(path_to_write, file_details[i].data);
      paths.push(file_details[i].name);
    }
    return paths;
  }

  /**
   * Synchronously gives all the implores
   */
  getAllImplores = async () => this.imploreRepository.getAllImplores();

  /**
   * @param data Implore response object to update the implore
   *
   * The update operation is performed synchronously
   */
  updateImplore = async (data: ImploreRO) =>
    await this.imploreRepository.updateImplore(data);

  /**
   * The implore is saved asynchronously
   * @param uploads Array of file object to save
   * @param data Implore details to save
   * @param author Author of the implore
   */
  saveImplore = async (
    uploads: IFile[],
    data: CreateImploreDTO,
    author: string
  ): Promise<ImploreRO | IErrorMessage> => {
    const BASE_PATH = process.env.BASE_DIR_PATH;
    const created_implore = await this.imploreRepository.saveImplore(
      data,
      author
    );
    if (created_implore.hasOwnProperty('error')) {
      return created_implore;
    } else {
      const casted_implore = created_implore as ImploreRO;
      if (casted_implore.metadata.document_attached && uploads.length) {
        const document_paths = this.writeAttachments(
          uploads,
          BASE_PATH,
          casted_implore
        );
        casted_implore.metadata.document_url = document_paths;
        return await this.imploreRepository.updateImplore(casted_implore);
      } else {
        return casted_implore;
      }
    }
  };
}
