class CategoriesController < ApplicationController
  before_action do 
    @current_nav = :contents
  end

  def index
    redirect_to category_path(Category.first)
  end

  def show
    @categories = Category.all.order(:position)
    @category = Category.find_by(slug: params[:id])
  end
end
