class StoriesController < ApplicationController
  before_action :set_story, only: [:show, :edit, :update, :destroy]

  # GET /stories
  # GET /stories.json
  def index
    @stories = Story.all
    render layout: false
  end

  # GET /stories/1
  # GET /stories/1.json
  def show
  end

  # GET /stories/new
  def new
    if user_signed_in?
      if current_user.email == 'craig@wermert.me' || current_user.email == 'nkulick.14@gmail.com'
        @story = Story.new
        render layout: false
      else
        render template: 'shared/not_logged_in'
      end
    else
      render template: 'shared/not_logged_in'
    end
  end

  # GET /stories/1/edit
  def edit
    if user_signed_in?
      if current_user.email == 'craig@wermert.me' || current_user.email == 'nkulick.14@gmail.com'
        render layout: false
      else
        render template: 'shared/not_logged_in'
      end
    else
      render template: 'shared/not_logged_in'
    end
  end

  # POST /stories
  # POST /stories.json
  def create
    @story = Story.new(story_params)

    respond_to do |format|
      if @story.save
        # format.html { redirect_to @story, notice: 'Story was successfully created.' }
        format.json { render :show, status: :created, location: @story }
      else
        # format.html { render :new }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /stories/1
  # PATCH/PUT /stories/1.json

  def update
    respond_to do |format|
      if @story.update(story_params)
        # format.html { redirect_to '/', notice: 'Story was successfully updated.' }
        format.json { render json: { status: :ok, story: story_params }}
      else
        # format.html { render :edit }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /stories/1
  # DELETE /stories/1.json
  def destroy
    @story.destroy
    respond_to do |format|
      format.html { redirect_to stories_url, notice: 'Story was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_story
      @story = Story.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def story_params
      params.require(:story).permit(:title, :time, :icon, :content)
    end
end
