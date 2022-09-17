CREATE PROCEDURE [dbo].[spAttachment_GetById]
	@id nvarchar(50)

AS 
BEGIN

	SELECT * FROM Attachments WHERE AttachmentId = @id

END
