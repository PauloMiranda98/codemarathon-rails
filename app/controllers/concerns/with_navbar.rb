module WithNavbar
  extend ActiveSupport::Concern

  private

  def set_navbar(current_path)
    @use_navbar = true
    @nav_items = [
      {
        title: "Início",
        url: "/",
        is_current: current_path == :home
      },
      {
        title:"Conteúdo",
        url: "#",
        is_current: current_path == :content
      },
      {
        title:"Questões",
        url: "#",
        is_current: current_path == :questions
      },
      {
        title:"Sobre",
        url: "#",
        is_current: current_path == :about
      }
    ]  
  end
end