# frozen_string_literal: true

module MarkdownWithLatex
  class MyRenderHtml < Redcarpet::Render::HTML
    include ActionView::Helpers::AssetTagHelper

    def image(link, title, alt_text)
      image_tag(formated_link(link), title:, alt: alt_text, class: "w-full")
    end

    def formated_link(link)
      return link if link.start_with? "http"

      ActionController::Base.helpers.asset_path(link)
    end

    def block_code(code, lang)
      %(<pre><code class="language-#{lang} rounded-lg shadow-lg w-full text-sm">#{code}</code></pre>)
    end

    def codespan(code)
      if code.start_with?("(TEX)") && code.end_with?("(TEX)")
        %(<span class="block-latex">#{code[5..-6]}</span>)
      elsif code.start_with?("(tex)") && code.end_with?("(tex)")
        %(<span class="inline-latex">#{code[5..-6]}</span>)
      else
        %(<code>#{code}</code>)
      end
    end
  end
end
