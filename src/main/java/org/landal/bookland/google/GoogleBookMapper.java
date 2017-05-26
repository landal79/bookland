package org.landal.bookland.google;

import com.google.api.services.books.model.Volume;
import org.landal.bookland.model.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "cdi")
public interface GoogleBookMapper {

//    @Mappings({
//            @Mapping(source = "make", target = "manufacturer"),
//            @Mapping(source = "numberOfSeats", target = "seatCount")
//    })
    Volume bookToVolume(Book book);

//    @Mapping(source = "name", target = "fullName")
    Book volumeToBook(Volume volume);
}
