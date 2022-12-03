# frozen_string_literal: true

class SubjectsController < ApplicationController
  before_action do
    config_current_nav(:contents)
  end

  def show
    @category = CodeMarathonContents::Api::Categories.find(
      slug: params[:category_id]
    )
    return not_found("Categoria não existe") if @category.blank?

    @subject = CodeMarathonContents::Api::Subjects.find(
      category_slug: params[:category_id],
      subject_slug: params[:id]
    )
    return not_found("Assunto não existe") if @subject.nil?

    @content = CodeMarathonContents::Api::Contents.find(
      category_slug: @category.slug,
      subject_slug: @subject.slug
    )
    return not_found("Conteúdo não foi escrito") if @content.nil?

    config_header(@category, @subject, @content)
  end

  def config_header(category, subject, content)
    config_head_title("#{subject.name} - #{category.name} - Code Marathon")
    config_head_description("Explicação sobre #{subject.name} em português (pt-BR) produzido pela comunidade Brasileira.")
  end
end
