# frozen_string_literal: true

class MarkdownWithLatexComponent < ViewComponent::Base
  def initialize(text:)
    @text = text
  end

  private
    def obtain_html
      text = pre_render(@text)

      renderer = MarkdownWithLatex::MyRenderHtml.new(
        link_attributes: {
          target: "_blank",
          rel: "noopener noreferer"
        }
      )
      markdown = Redcarpet::Markdown.new(
        renderer,
        autolink: true,
        tables: true,
        fenced_code_blocks: true
      )
      markdown.render(text)
    end

    def pre_render(text)
      text = save_dollar_signs(text)

      text = transform_block_latex(text)
      text = transform_inline_latex(text)

      restore_dollar_signs(text)
    end

    def save_dollar_signs(text)
      text.gsub("\\$", "<dollar>")
    end

    def transform_block_latex(text)
      transform_tags(text, "$$", "`(TEX)", "(TEX)`")
    end

    def transform_inline_latex(text)
      transform_tags(text, "$", "`(tex)", "(tex)`")
    end

    def restore_dollar_signs(text)
      text.gsub("<dollar>", "$")
    end

    def transform_tags(text, match, open_tag, close_tag)
      is_open = false

      text.gsub(match) do
        is_open = !is_open

        if is_open
          open_tag
        else
          close_tag
        end
      end
    end
end
