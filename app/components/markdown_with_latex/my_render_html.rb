# frozen_string_literal: true

module MarkdownWithLatex
  class MyRenderHtml < Redcarpet::Render::HTML
    include ActionView::Helpers::AssetTagHelper
    include ActionView::Helpers::SanitizeHelper
    include ERB::Util

    def image(link, title, alt_text)
      image_tag(formated_link(link), title:, alt: alt_text, class: "w-full")
    end

    def block_code(code, lang)
      if lang == "youtube"
        build_youtube_link(code.strip)
      else
        build_block_code(code, lang)
      end
    end

    def codespan(code)
      if code.start_with?("(TEX)") && code.end_with?("(TEX)")
        %(<span class="block-latex">#{html_escape(code[5..-6])}</span>)
      elsif code.start_with?("(tex)") && code.end_with?("(tex)")
        %(<span class="inline-latex">#{html_escape(code[5..-6])}</span>)
      else
        %(<code>#{html_escape(code)}</code>)
      end
    end

    private
      def formated_link(link)
        return link if link.start_with? "http"

        ActionController::Base.helpers.asset_path(link)
      end

      def build_youtube_link(id)
        "<a href=\"https://www.youtube.com/watch?v=#{id}\" target=\"_blank\" rel=\"noopener noreferer\">" \
          "<img alt=\"Video no YouTube\" class=\"w-full\" src=\"https://img.youtube.com/vi/#{id}/0.jpg\">" \
        "</a>"
      end

      def build_block_code(code, lang)
        "<pre>" \
          "<code class=\"language-#{sanitize(lang)} rounded-lg shadow-lg w-full text-sm\">" \
            "#{html_escape(code)}" \
          "</code>" \
        "</pre>"
      end
  end
end
