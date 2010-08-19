# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password
  
  before_filter :initialize_wordnik
  def initialize_wordnik(options={})
    options.merge!({:api_key=>API_KEY})
    @wordnik = Wordnik::Wordnik.new(options)
  end

  before_filter :get_word
  def get_word
    @word = Wordnik::Word.find(params[:wordstring]) if (params[:wordstring] && !params[:wordstring].blank?)
  end

end
