class ProjectsController < ApplicationController
    before_action :set_project, only: [:show, :edit, :update]
       # project/projects are nil upon creation. param is missing or the value is empty
    def index 
        # binding.pry
        @projects = Project.all
        render json: @projects.to_json(include: [:developer], except: [:created_at, :updated_at])
            
    end
   
    def new
        @project = Project.new
    end

    def create
    # binding.pry
        @project = Project.new(project_params)
            if @project.save
                render_project       
            else
                render json: @project.errors, status: :unprocessable_entity
            end
        # binding.pry
    end
   
    def show
        render_project
    end
   
    def edit
    end
   
    def update 
        if @project.update(project_params)
            render_project
        else
            render json: @project.errors, status: :unprocessable_entity        
        end
    end
   
    private
   
       def render_project
           render json: @project, except: [:created_at, :updated_at]
       end
   
       # def set_developer
       #     # @developer = Developer.find_by_id(params[:developer_id])
       # end
   
       def set_project
           @project = Project.find_by_id(params[:id])
       end
   
       def project_params
           params.require(:project).permit(:name, :started, :deadline, :description, :completed, :developer_id)
       end
end
   