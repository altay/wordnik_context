# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_wordnik_context_session',
  :secret      => '909128268ba7e6ba1ee4973c0717421c4ad05d17b3f1c37ffa4da75e7c55ad9e43e99d2115bbee178b1c47fbf143f053eedf901dd670dc38cfb1099651ce0bb9'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
