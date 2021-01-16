class ProjectsController < ApplicationController

    # project/projects are nil upon creation. param is missing or the value is empty
    before_action :set_project, only: [:show, :update]

    # GET /projects
    def index
        @projects = Project.all
    
        render json: @projects, except: [:created_at, :updated_at]
    end
    
    # GET /projects/1
    def show
        render json: @project,except: [:created_at, :updated_at]
    end
    
    # POST /projects
    def create
        @project = Project.new(project_params)
        if @project.save
            render json: @project, status: :created, location: @project
        else
            render json: @project.errors, status: :unprocessable_entity
        end
    end
end
   