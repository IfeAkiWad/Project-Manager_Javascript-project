class DevelopersController < ApplicationController
    def index
        developers = Developer.all
        render json: developers
    end
end
