class HomeController < ApplicationController
  def index
    @use_navbar = true
    @nav_items = [
      {
        title: "Início",
        url: "/",
        is_current: true
      },
      {
        title:"Conteúdo",
        url: "#",
        is_current: false
      },
      {
        title:"Questões",
        url: "#",
        is_current: false
      },
      {
        title:"Sobre",
        url: "#",
        is_current: false
      }
    ] 
  end
end
