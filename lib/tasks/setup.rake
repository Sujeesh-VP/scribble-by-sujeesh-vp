desc 'drops the db, creates db, migrates db and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
  Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "sample data has been added."
  end
end

def create_sample_data!
  puts 'Seeding with sample data...'
  category = create_category! name: "Getting Started"
  create_article! title: "Welcome to Scribble", status: "draft", category: category
  create_article! title: "Writing an article", status: "published", category: category
  create_article! title: "Publishing an article", status: "draft", category: category
  category = create_category! name: "Security & Privacy"
  create_article! title: "Redirections", status: "published", category: category
  create_article! title: "Unprotected Scribble", status: "published", category: category
  category = create_category! name: "Misc"
  create_article! title: "Typography", status: "draft", category: category
  create_article! title: "Font size", status: "published", category: category
  create_article! title: "Font weight", status: "draft", category: category
end

def create_category!(attributes = {})
  Category.create! attributes
end

def create_article!(options = {})
  article_attributes = {content: "Lorem ipsum"}
  attributes = article_attributes.merge options
  Article.create! attributes
end
