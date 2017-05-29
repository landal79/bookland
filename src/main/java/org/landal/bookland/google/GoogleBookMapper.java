package org.landal.bookland.google;

import com.google.api.services.books.model.Volume;
import org.apache.commons.collections4.CollectionUtils;
import org.landal.bookland.mappers.DateMapper;
import org.landal.bookland.model.Book;
import org.mapstruct.*;

import java.util.List;

@Mapper(
        componentModel = "cdi",
        uses = {DateMapper.class, AuthorMapper.class}
)
public interface GoogleBookMapper {

//    @Mappings({
//            @Mapping(source = "make", target = "manufacturer"),
//            @Mapping(source = "numberOfSeats", target = "seatCount")
//    })
//    Volume bookToVolume(Book book);

    @Mapping(source = "volumeInfo.title", target = "title")
    @Mapping(source = "volumeInfo.description", target = "description")
    @Mapping(source = "volumeInfo.ratingsCount", target = "rating")
    @Mapping(source = "volumeInfo.publishedDate", target = "publishingDate")
    @Mapping(source = "volumeInfo.authors", target = "authors")
    Book volumeToBook(Volume volume);

    @AfterMapping
    default void after(Volume volume, @MappingTarget Book book) {
        if (volume == null) {
            return;
        }
        Volume.VolumeInfo volumeInfo = volume.getVolumeInfo();
        if (volumeInfo == null) {
            return;
        }

        List<Volume.VolumeInfo.IndustryIdentifiers> identifiers = volumeInfo.getIndustryIdentifiers();
        if (CollectionUtils.isEmpty(identifiers)) {
            return;
        }

        book.setIsbn(
                volume.getVolumeInfo()
                        .getIndustryIdentifiers()
                        .stream()
                        .filter(i -> "ISBN_13".equals(i.getType()))
                        .findAny()
                        .map(i -> i.getIdentifier())
                        .orElse(null)
        );
    }

}
