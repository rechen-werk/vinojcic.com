import { Language } from "./Language";
import { Theme } from "./Theme";

export interface User {
  email: string;
  name: string;
  username: string;
  roles: string[];
  language: Language;
  theme: Theme;
  uuid: string;
}
