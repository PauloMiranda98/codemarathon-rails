import { application } from "../controllers/application"

import NavbarComponent from "../../components/navbar_component_controller"
application.register("components--navbar", NavbarComponent)

import MarkdownWithLatexComponent from "../../components/markdown_with_latex_component"
application.register("components--markdown-with-latex", MarkdownWithLatexComponent)
