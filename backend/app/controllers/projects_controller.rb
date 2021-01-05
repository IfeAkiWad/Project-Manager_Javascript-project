class ProjectsController < ApplicationController
    before_action :set_project, only: [:show, :edit, :update]
       # project is nil and doctor is nil
   
    def index
        @projects = Project.all
            # binding.pry
            # @projects = @developer.projects #causes error: undefined local variable or method `developer'
        render json: @projects.to_json(except: [:created_at, :updated_at])
    end
   
    def create
        @project = Project.create(project_params)
           # @project = @developer.projects.new(project_params) 
            if @project.save
               render_project       
           else
               render json: @project.errors, status: :unprocessable_entity
           end
    end
   
    def show
           # project = Project.find_by(id: params[:id])
           # if params[:started] == " "
           #     render json: { message: 'Start project' }
           #   end
        render_project
    end
   
    def edit
    end
   
    def update # how do I build this using json ???
        if @project.update(project_params)
            render_project
        else
               # ???
            render json: @project.errors, status: :unprocessable_entity        end
    end
   
    private
   
       def render_project
           render json: @project.to_json(except: [:created_at, :updated_at])
       end
   
       # def set_developer
       #     # @developer = Developer.find_by_id(params[:developer_id])
       # end
   
       def set_project
           @project = Project.find_by_id(params[:id])
       end
   
       def project_params
           params.require(:project).permit(:name, :started, :deadline, :description, :completed)
       end
end
   