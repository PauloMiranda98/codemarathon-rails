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
    @subjects = @category.subjects.order(:position) 

    if @subjects.blank?
      @subjects = 16.times.map do |i|
        Subject.new(
          id: i,
          name: "Números Primos", 
          slug: "numeros-primos",
          obi_frequency: rand(0..4),
          icpc_frequency: rand(0..4)
        ) 
      end
    end
  end
end
