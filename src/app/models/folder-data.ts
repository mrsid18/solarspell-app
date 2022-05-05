import { Folder } from './folder';
import { Content } from './content';

export class FolderData {
    constructor() {}
    public parentFolder: Folder;
    public folders: Array<Folder>;
    public content: Array<Content>;
}
