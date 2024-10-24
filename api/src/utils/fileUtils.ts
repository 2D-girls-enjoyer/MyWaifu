import fs from 'node:fs/promises';

class FileSystemUtils {
  public async read(
    directory: string,
    fileName: string,
    forceCreation?: boolean,
  ): Promise<string> {
    if (forceCreation) {
      try {
        return await fs.readFile(`${directory}/${fileName}`, 'utf-8');
      } catch (err: any) {
        if (err.code !== 'ENOENT') {
          console.log(`Unexpected error reading file ${directory}/${fileName}`);
          throw new Error(`Unexpected error reading file ${directory}/${fileName}`);
        }
        const content = '';
        await this.write(directory, fileName, content, true);

        return content;
      }
    }

    return fs.readFile(`${directory}/${fileName}`, 'utf-8');
  }

  public async write(
    directory: string,
    fileName: string,
    content: string,
    forceCreation?: boolean,
  ): Promise<void> {
    if (forceCreation) {
      try {
        await fs.access(directory);
      } catch (err: any) {
        await fs.mkdir(directory, { recursive: true });
      }
    }

    await fs.writeFile(`${directory}/${fileName}`, content);
  }

  public async delete(directory: string, fileName: string): Promise<void> {
    try {
      await fs.unlink(`${directory}/${fileName}`);
    } catch (err: any) {
      console.log(err);

      console.log(`${directory}/${fileName} may already have been deleted`);
    }
  }
}

export default new FileSystemUtils();
