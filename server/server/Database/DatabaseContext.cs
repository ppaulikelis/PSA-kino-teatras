using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using server.Models;

#nullable disable

namespace server.Database
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Administrator> Administrators { get; set; }
        public virtual DbSet<ChairType> ChairTypes { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Genre> Genres { get; set; }
        public virtual DbSet<Manager> Managers { get; set; }
        public virtual DbSet<Movie> Movies { get; set; }
        public virtual DbSet<MovieHall> MovieHalls { get; set; }
        public virtual DbSet<MovieTheatre> MovieTheatres { get; set; }
        public virtual DbSet<OrderTable> OrderTables { get; set; }
        public virtual DbSet<Seat> Seats { get; set; }
        public virtual DbSet<Session> Sessions { get; set; }
        public virtual DbSet<Size> Sizes { get; set; }
        public virtual DbSet<Snack> Snacks { get; set; }
        public virtual DbSet<SnackType> SnackTypes { get; set; }
        public virtual DbSet<Subscription> Subscriptions { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySQL("server=localhost;port=3306;database=psa_kino_teatras;user=root;password=;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Administrator>(entity =>
            {
                entity.ToTable("administrator");

                entity.HasIndex(e => e.FkUserId, "fk_User_id");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.FkUserId)
                    .HasColumnType("int(11)")
                    .HasColumnName("fk_User_id");
            });

            modelBuilder.Entity<ChairType>(entity =>
            {
                entity.ToTable("chair_type");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Price)
                    .HasColumnType("int(11)")
                    .HasColumnName("price");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("title");
            });

            modelBuilder.Entity<Client>(entity =>
            {
                entity.ToTable("client");

                entity.HasIndex(e => e.FavouriteGenre, "favourite_genre");

                entity.HasIndex(e => e.FkUserId, "fk_User_id");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.FavouriteGenre)
                    .HasColumnType("int(11)")
                    .HasColumnName("favourite_genre");

                entity.Property(e => e.FkUserId)
                    .HasColumnType("int(11)")
                    .HasColumnName("fk_User_id");

                entity.Property(e => e.WatchedMovieCount)
                    .HasColumnType("int(11)")
                    .HasColumnName("watched_movie_count");
            });

            modelBuilder.Entity<Genre>(entity =>
            {
                entity.ToTable("genre");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(15)
                    .HasColumnName("name")
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<Manager>(entity =>
            {
                entity.ToTable("manager");

                entity.HasIndex(e => e.FkUserId, "fk_User_id");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.FkUserId)
                    .HasColumnType("int(11)")
                    .HasColumnName("fk_User_id");
            });

            modelBuilder.Entity<Movie>(entity =>
            {
                entity.ToTable("movie");

                entity.HasIndex(e => e.Genre, "genre");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Duration)
                    .HasColumnType("int(11)")
                    .HasColumnName("duration");

                entity.Property(e => e.EndDate)
                    .HasColumnType("date")
                    .HasColumnName("end_date");

                entity.Property(e => e.Genre)
                    .HasColumnType("int(11)")
                    .HasColumnName("genre");

                entity.Property(e => e.Icon)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("icon");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.StartDate)
                    .HasColumnType("date")
                    .HasColumnName("start_date");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("title");
            });

            modelBuilder.Entity<MovieHall>(entity =>
            {
                entity.ToTable("movie_hall");

                entity.HasIndex(e => e.FkMovieTheatreId, "fk_Movie_theatre_id");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.FkMovieTheatreId)
                    .HasColumnType("int(11)")
                    .HasColumnName("fk_Movie_theatre_id");

                entity.Property(e => e.Number)
                    .HasColumnType("int(11)")
                    .HasColumnName("number");
            });

            modelBuilder.Entity<MovieTheatre>(entity =>
            {
                entity.ToTable("movie_theatre");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("address");
            });

            modelBuilder.Entity<OrderTable>(entity =>
            {
                entity.ToTable("order_table");

                entity.HasIndex(e => e.FkClientId, "creates");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.AnswerDate)
                    .HasColumnType("date")
                    .HasColumnName("answer_date");

                entity.Property(e => e.FkClientId)
                    .HasColumnType("int(11)")
                    .HasColumnName("fk_Client_id");

                entity.Property(e => e.IsPaid).HasColumnName("is_paid");

                entity.Property(e => e.OrderDate)
                    .HasColumnType("date")
                    .HasColumnName("order_date");
            });

            modelBuilder.Entity<Seat>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.FkMovieHallId })
                    .HasName("PRIMARY");

                entity.ToTable("seat");

                entity.HasIndex(e => e.FkMovieHallId, "fk_Movie_hall_id");

                entity.HasIndex(e => e.FkChairTypeId, "turi");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.FkMovieHallId)
                    .HasColumnType("int(11)")
                    .HasColumnName("fk_Movie_hall_id");

                entity.Property(e => e.FkChairTypeId)
                    .HasColumnType("int(11)")
                    .HasColumnName("fk_Chair_type_id");

                entity.Property(e => e.Number)
                    .HasColumnType("int(11)")
                    .HasColumnName("number");

                entity.Property(e => e.Row)
                    .HasColumnType("int(11)")
                    .HasColumnName("row");
            });

            modelBuilder.Entity<Session>(entity =>
            {
                entity.ToTable("session");

                entity.HasIndex(e => e.FkMovieHallId, "has");

                entity.HasIndex(e => e.FkMovieId, "is_shown");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.FkMovieHallId)
                    .HasColumnType("int(11)")
                    .HasColumnName("fk_Movie_hall_id");

                entity.Property(e => e.FkMovieId)
                    .HasColumnType("int(11)")
                    .HasColumnName("fk_Movie_id");

                entity.Property(e => e.StartTime)
                    .HasColumnType("date")
                    .HasColumnName("start_time");
            });

            modelBuilder.Entity<Size>(entity =>
            {
                entity.ToTable("size");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(6)
                    .HasColumnName("name")
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<Snack>(entity =>
            {
                entity.ToTable("snack");

                entity.HasIndex(e => e.Size, "size");

                entity.HasIndex(e => e.Type, "type");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Size)
                    .HasColumnType("int(11)")
                    .HasColumnName("size");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("title");

                entity.Property(e => e.Type)
                    .HasColumnType("int(11)")
                    .HasColumnName("type");
            });

            modelBuilder.Entity<SnackType>(entity =>
            {
                entity.ToTable("snack_type");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(5)
                    .HasColumnName("name")
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<Subscription>(entity =>
            {
                entity.ToTable("subscription");

                entity.HasIndex(e => e.FkMovieId, "fk_Movie_id");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.AnswerDate)
                    .HasColumnType("date")
                    .HasColumnName("answer_date");

                entity.Property(e => e.FkMovieId)
                    .HasColumnType("int(11)")
                    .HasColumnName("fk_Movie_id");

                entity.Property(e => e.IsSent).HasColumnName("is_sent");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("password");

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("surname");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
