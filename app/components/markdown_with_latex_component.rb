# frozen_string_literal: true

class MarkdownWithLatexComponent < ViewComponent::Base
  def initialize(text:)
    @text = text
  end

  private
    def obtain_html
      text = pre_customization(@text)

      renderer = MarkdownWithLatex::MyRenderHtml.new(
        link_attributes: {
          target: "_blank",
          rel: "noopener noreferer"
        }
      )
      markdown = Redcarpet::Markdown.new(renderer,
                                         autolink: true,
                                         tables: true,
                                         fenced_code_blocks: true)
      text = markdown.render(text)

      pos_customization(text)
    end

    def pre_customization(text)
      text.gsub("\\$", "<dollar>")
    end

    def pos_customization(text)
      # Add Code Highlighting
      text = add_code_highlighting(text, "cpp")
      text = add_code_highlighting(text, "python")
      text = add_code_highlighting(text, "java")

      # Add LaTeX
      text = add_block_latex(text)
      text = add_inline_latex(text)

      # Add Dollar
      add_dollar_simbol(text)
    end

    def add_code_highlighting(text, language)
      text.gsub(
        "<pre><code class=\"#{language}\">",
        "<pre><code class=\"language-#{language} rounded-lg shadow-lg w-full text-sm\">"
      )
    end

    def add_block_latex(text)
      is_open = false

      text.gsub("$$") do
        is_open = !is_open

        if is_open
          "<span class=\"block-latex\">"
        else
          "</span>"
        end
      end
    end

    def add_inline_latex(text)
      is_open = false

      text.gsub("$") do
        is_open = !is_open

        if is_open
          "<span class=\"inline-latex\">"
        else
          "</span>"
        end
      end
    end

    def add_dollar_simbol(text)
      text = text.gsub("<dollar>", "$")
      text.gsub("&lt;dollar&gt;", "$")
    end
end
