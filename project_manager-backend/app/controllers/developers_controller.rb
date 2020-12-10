class DevelopersController < ApplicationController
    def index
        developers = Developer.all
        render json: developers.to_json(except: [:created_at, :updated_at])
    end
    
    def show
        developer = Developer.find_by(id: params[:id])
        render json: developer.to_json(:include => {:projects => {:only => [:name, :started, :deadline, :description, :completed]}}, :except => [:updated_at], :except => [:created_at, :updated_at])
    end
end
