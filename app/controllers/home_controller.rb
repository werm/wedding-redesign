class HomeController < ApplicationController
  def index
    @stories = Story.all
    @bio = Biography.all
    # @nic_bio = Biography.where(Biography.person == 'Nicole Kulick')
  end
end
