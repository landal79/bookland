package org.landal.bookland.google;

import com.google.api.services.books.model.Volume;
import org.landal.bookland.mappers.DateMapper;
import org.landal.bookland.model.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "cdi", uses=DateMapper.class)
public interface GoogleBookMapper {

//    @Mappings({
//            @Mapping(source = "make", target = "manufacturer"),
//            @Mapping(source = "numberOfSeats", target = "seatCount")
//    })
//    Volume bookToVolume(Book book);

//    @Mapping(source = "name", target = "fullName")
    @Mapping(source ="volumeInfo.title", target = "title")
    @Mapping(source ="volumeInfo.description", target = "description")
    @Mapping(source ="volumeInfo.ratingsCount", target = "rating")
    @Mapping(source ="volumeInfo.publishedDate", target = "publishingDate")
    Book volumeToBook(Volume volume);
}
