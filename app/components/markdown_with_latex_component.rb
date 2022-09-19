class MarkdownWithLatexComponent < ViewComponent::Base
  def initialize(text:)
    @text = text
  end

  private
  
  def obtain_html
    text = pre_customization(@text)
    
    renderer = Redcarpet::Render::HTML.new(
      link_attributes: {
        target: "_blank",
        rel: "noopener noreferer"
      }
    )
    markdown = Redcarpet::Markdown.new(renderer, 
      autolink: true, 
      tables: true, 
      fenced_code_blocks: true
    )    
    text = markdown.render(text)

    text = pos_customization(text)
  end

  def pre_customization(text)
    text
  end

  def pos_customization(text)
    # Add Code Highlighting
    text = text.gsub(
      '<pre><code class="cpp">',
      '<pre><code class="language-cpp rounded-lg shadow-lg w-full text-sm">'
    )

    # Add LaTeX
    text = text.gsub('<e>', '<span class="inline-latex">')
    text = text.gsub('</e>', '</span>')
    text = text.gsub('<be>', '<span class="block-latex">')
    text = text.gsub('</be>', '</span>')
    
    text
  end
end