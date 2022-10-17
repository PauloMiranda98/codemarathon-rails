module MarkdownWithLatex
  class MyRenderHtml < Redcarpet::Render::HTML
    include ActionView::Helpers::AssetTagHelper
    
    def image(link, title, alt_text)
      image_tag(formated_link(link), title: title, alt: alt_text)
    end

    def formated_link(link)
      return link if link.start_with? 'http'

      ActionController::Base.helpers.asset_path(link)
    end
  end
end
