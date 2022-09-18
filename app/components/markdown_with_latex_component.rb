class MarkdownWithLatexComponent < ViewComponent::Base
  def initialize(text:)
    @text = text
  end

  private
  
  def obtain_html
    text = pre_customization(@text)

    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true, fenced_code_blocks: true)
    text = markdown.render(text)

    text = pos_customization(text)
  end

  def pre_customization(text)
    text
  end

  def pos_customization(text)
    text = text.gsub(
      '<pre><code class="cpp">',
      '<pre><code class="language-cpp rounded-lg shadow-lg w-full text-sm">'
    )
    
    text
  end
end