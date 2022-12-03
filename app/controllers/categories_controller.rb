# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action do
    config_current_nav(:contents)
  end

  before_action :load_categories

  def index
    redirect_to category_path(@categories.first.slug)
  end

  def show
    @category = obtain_category(params[:id])
    return not_found("Categoria não existe") if @category.blank?

    config_header(@category)

    @subjects = @category.subjects
  end

  private
    def load_categories
      @categories = CodeMarathonContents::Api::Categories.find_all

      @category_by_slug = {}
      @categories.each do |category|
        @category_by_slug[category.slug] = category
      end
    end

    def obtain_category(slug)
      @category = @category_by_slug[slug]
    end

    def config_header(category)
      config_head_title("#{category.name} - Code Marathon")
      config_head_description("Conteúdos sobre o tema #{category.name} em português (pt-BR) produzido pela comunidade Brasileira.")
    end
end
